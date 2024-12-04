const service = require('./messages.service.js');
const response = require('../../utils/response.js');
const store = require('store2');
const { addMessageLog } = require('../../db/messages_logs.js');
const { getHumanReadableDateTime } = require('../../utils/tims_utils');


const SendWhatsApp = async (req, res) => {

    const receipt = req.query.receipt;
    const msg = req.query.msg;

    try {
        const canUseWhatsapp = store.get("canUseWhatsapp");
        const isBlocked = store.get("isBlocked");

        if (isBlocked) {
            //  NotificationService.sendNotification('إرسال واتساب', 'المعذرة انت محظور من إستخدام نظام سراج!');
            const title = 'رسائل الواتساب'
            const message = 'المعذرة انت محظور من إستخدام نظام سراج'
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }

            await addMessageLog(receipt, msg, getHumanReadableDateTime(), 1, 0, 'محظور');
            return response(res, 500, 'إرسال واتساب', 'المعذرة انت محظور من إستخدام نظام سراج');
        }

        if (!canUseWhatsapp) {
            const title = 'رسائل الواتساب'
            const message = 'المعذرة انت لست مشترك في هذه الخدمة'
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }

            await addMessageLog(receipt, msg, getHumanReadableDateTime(), 1, 0, 'غير مشترك');
            return response(res, 500, 'المعذرة انت لست مشترك في هذه الخدمة');
        }



        const result = await service.SendWhatsApp(receipt, msg);

        if (result.success) {
            const title = 'رسائل الواتساب'
            const message = `تم إرسال واتساب للرقم ${receipt} بنجاح!`
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }
            await addMessageLog(receipt, msg, getHumanReadableDateTime(), 1, 1, 'إرسال ناجح');
            return response(res, 200, { success: true });
        } else {
            const title = 'رسائل الواتساب'
            const message = result.data
            if (process.send) {
                process.send({ type: 'notify-main', title, message });
            }
            await addMessageLog(receipt, msg, getHumanReadableDateTime(), 1, 0, result.data);
            return response(res, 500, result.data);
        }
    } catch (error) {
        const title = 'رسائل الواتساب'
        const message = error.message
        if (process.send) {
            process.send({ type: 'notify-main', title, message });
        }
        await addMessageLog(receipt, msg, getHumanReadableDateTime(), 1, 0, error.message);
        return response(res, 500, error.message);
    }
};

module.exports = { SendWhatsApp };
