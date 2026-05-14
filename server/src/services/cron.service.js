const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { prisma } = require('../config/prisma');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const startCronJobs = () => {
  cron.schedule(' * * * * *', async () => {
    console.log('[Cron Job] Đang kiểm tra các Task tới hạn...')

    try {
      const now = new Date()

      const dueTasks = await prisma.task.findMany({
        where: {
          scheduleDate: {
            lte: now
          },
          status: {
            in: ['NEW', 'PROGRESS', 'ACTIVE']
          }
        },
        include: {
          user: true
        }
      })
      if (dueTasks.length > 0) {
        for (const task of dueTasks) {
          await prisma.task.update({
            where: { id: task.id },
            data: { status: 'REMIND' }
          })
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: task.user.email,
            subject: `Đến hạn: ${task.title}`,
            html: `
              <h3>Chào ${task.user.name},</h3>
              <p>Công việc <strong>"${task.title}"</strong> của bạn đã tới giờ thực hiện!</p>
              <p><strong>Mô tả:</strong> ${task.description || 'Không có mô tả'}</p>
              <p>Vui lòng đăng nhập vào hệ thống để cập nhật tiến độ nhé.</p>
              <br/>
              <p>Trân trọng,<br/>TaskFlow System</p>
            `
          };
          await transporter.sendMail(mailOptions);
          console.log(`Send email remind to ${task.user.email}`)
        }
      }
    } catch (error) {
      console.log('Cron job error:', error);
    }
  })
}

module.exports = { startCronJobs }