const service = require('./messages.service.js');
const response = require('../../utils/response.js');


const SendWhatsApp = async (req, res) => {

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('../../../../localstorage');
    }



    try {
        const canUseWhatsapp = localStorage.getItem("canUseWhatsapp");
        const isBlocked = localStorage.getItem("isBlocked");

        console.log("asdasd")
        console.log(canUseWhatsapp)
        console.log(isBlocked)


        if (isBlocked) {
            //  NotificationService.sendNotification('إرسال واتساب', 'المعذرة انت محظور من إستخدام نظام سراج!');
            const title = 'رسائل الواتساب'
            const message = 'المعذرة انت محظور من إستخدام نظام سراج'
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }
            return response(res, 500, 'إرسال واتساب', 'المعذرة انت محظور من إستخدام نظام سراج');
        }

        if (!canUseWhatsapp) {
            const title = 'رسائل الواتساب'
            const message = 'المعذرة انت لست مشترك في هذه الخدمة'
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }

            return response(res, 500, 'المعذرة انت لست مشترك في هذه الخدمة');
        }

        const receipt = req.query.receipt;
        const msg = req.query.msg;

        const result = await service.SendWhatsApp({ receipt, msg });

        if (result.success) {
            const title = 'رسائل الواتساب'
            const message = 'تم إرسال رسالة الواتساب بنجاح'
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }
            return response(res, 200, { success: true });
        } else {
            const title = 'رسائل الواتساب'
            const message = result.data
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }
            return response(res, 500, result.data);
        }
    } catch (error) {
        // window.context.sendNotification('إرسال واتساب', error.message);
        // NotificationService.sendNotification('إرسال واتساب', error.message);
        // Send the event to the main process
        const title = 'رسائل الواتساب'
        const message = error.message
        if (process.send) {
            process.send({ type: 'notify-main', title, message });
        }
        return response(res, 500, error.message);
    }
};

module.exports = { SendWhatsApp };
