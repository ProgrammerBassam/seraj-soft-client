

//const { sendMessage } = require('../../utils/whatsapp_service.js')

const SendWhatsApp = async (receipt, msg) => {
    try {

        const result = { success: false, data: 'لم نتمكن من إرسال رسالة الواتساب لأنك غير متصل' }// await sendMessage(receipt, msg)
        return result

    } catch (error) {

        throw error
    }
}

module.exports = { SendWhatsApp }