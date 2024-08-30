const cron = require("node-cron")
const Job = require("../models/jobSchema.js")
const User = require("../models/userSchema.js")
const {sendEmail} = require("../utils/sendEmail.js")

module.exports.newsLetterCron = async () => {
    // And this cron is basically used for scheduling that how many times after this work will be done
    // Here stars meaning:
    // 1>> After how many minutes
    // 2>> hours
    // 3>> days
    // 4>> in which month
    // 5>> in which week day
    cron.schedule("*/1 * * * * ", async () => {
        // console.log("Running the Cron Automation!")
        const jobs = await Job.find({newsLettersSend: false});

        for (const job of jobs) {
            try {
                const filterUsers = await User.find({ // Here $or is used for filtering the users having out of three niches found
                    $or: [
                        {
                            "niches.firstNiche": job.jobNiche
                        }, {
                            "niches.secondNiche": job.jobNiche
                        }, {
                            "niches.thirdNiche": job.jobNiche
                        },
                    ]
                })

                for (const user of filterUsers) {
                    const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
                    const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`;
                    sendEmail({
                        email:user.email,
                        subject,
                        message
                    })
                }

                job.newsLettersSend = true
                await job.save();
            } catch (error) {
                console.log("ERROR IN NODE CORN CATCH BLOCK")
                return next(console.error(error || "Some Error in the Cron."))
            }
        }
    })
}
