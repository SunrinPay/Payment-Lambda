const axios = require("axios");

exports.handler = async (event) => {
	try {
		let result = (
			await axios.post(
				"https://kapi.kakao.com/v1/payment/ready",
				{
					cid: "TC0ONETIME",
					partner_order_id: 1,
					partner_user_id: 1,
					item_name: event.item_name,
					quantity: event.quantity,
					total_amount: event.total_amount,
					vat_amount: event.vat_amount,
					tax_free_amount: event.tax_free_amount,
					approval_url: "https://sunrinpay.web.app/",
					fail_url: "https://sunrinpay.web.app/",
					cancel_url: "https://sunrinpay.web.app/",
				},
				{
					headers: {
						Authorization: `KakaoAK REQUIRE_KEY`,
						"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
						"Access-Control-Allow-Origin": "*",
					},
				}
			)
		).data;
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify("bad request"),
		};
	}
	return {
		statusCode: 200,
		body: JSON.stringify(result),
	};
};
