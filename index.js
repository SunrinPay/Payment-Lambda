const axios = require("axios");
const qs = require("qs");

exports.handler = async (event) => {
	let statusCode = 200;
	let result;
	let body = {};
	try {
		if (event.body) body = JSON.parse(event.body);
		result = (
			await axios.post(
				"https://kapi.kakao.com/v1/payment/ready",
				qs.stringify({
					cid: "TC0ONETIME",
					partner_order_id: 1,
					partner_user_id: 1,
					item_name: body.item_name,
					quantity: body.quantity,
					total_amount: body.total_amount,
					vat_amount: body.vat_amount,
					tax_free_amount: body.tax_free_amount,
					approval_url: "https://sunrinpay.com/",
					fail_url: "https://sunrinpay.com/",
					cancel_url: "https://sunrinpay.com/",
				}),
				{
					headers: {
						Authorization: `KakaoAK f04393e97922b0f19fb8be5852092f25`,
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					},
				}
			)
		).data;
	} catch (err) {
		statusCode = 200;
		result = err;
	}
	return {
		statusCode,
		body: JSON.stringify(result),
	};
};
