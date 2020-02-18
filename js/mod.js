trEvent = () => {};
trEventBe = () => {};

const dtToStr = in_dt => {
	const dt = new Date(in_dt);
	const year = dt.getFullYear().toString().padStart(4, 0);
	const month = (dt.getMonth() + 1).toString().padStart(2, 0);
	const date = dt.getDate().toString().padStart(2, 0);
	const hour = dt.getHours().toString().padStart(2, 0);
	const minute = dt.getMinutes().toString().padStart(2, 0);
	const second = dt.getSeconds().toString().padStart(2, 0);
	return year+month+date+hour+minute+second;
}

const dtToStr2 = in_dt => {
	const dt = new Date(in_dt);
	const year = dt.getFullYear().toString();
	const month = (dt.getMonth() + 1).toString();
	const date = dt.getDate().toString();
	const day = ['日', '月', '火', '水', '木', '金', '土'][dt.getDay()];
	return `${year}年${month}月${date}日(${day})`;
} 

const stamping = (num, date) => {
	const dt1 = new Date(date);
	const dt2 = new Date(+dt1+1800000);
	const sdt1 = dtToStr(dt1);
	const sdt2 = dtToStr(dt2);
	$('.coupon-wrap').eq(num).removeClass('active').off().after('<div class="txt coupon_sumi_caution"> <span>※利用期間は<span class="coupon_inner3_caution_list_bold">30分間</span>です。30分以内に店頭で手続きを行わない場合、自動的に利用済になります。</span> </div>');
	$('.mog-sumi').eq(num).html(`<img src="/images/aukaraokecp/coupon_sumi.png" alt="済_ご利用ありがとうございました。" width="240" class="mar_t_25"> <div class="coupon_sumi_date mar_t_20"> <p>利用開始日時</p><span>${sdt1}</span><br><p class="mar_t_5">利用終了日時</p><span>${sdt2}</span><br><p class="mar_t_10"></p></div>`);
	setMog(num, 120);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const waitUntil = (conditionFn, ms=100) => new Promise(resolve => {
	const id = setInterval(() => {
		if (conditionFn()) {
			clearInterval(id);
			resolve();
		}
	}, ms);
});

(async () => {
if ('/aukaraokecp/coupon/' === location.pathname.slice(0, 20)) {
	const dt1 = new Date();
	const dt2 = new Date(+dt1+86400000);
	const sdt1 = dtToStr2(dt1);
	const sdt2 = dtToStr2(dt2);
	$('.coupon_status_bg_list').html(`${sdt1}オープンから<br>${sdt2} AM7時まで`);

	const timeStamp = window.parent.timeStamp;

	$('#checkin').attr('action', 'javascript:void(0)').on('submit', async ()=>{
		const i = +$('#checkin_coupon_type').val() - 1;
		timeStamp[i] = new Date();
		await sleep(750);
		location.replace(location.href);
	});

	await waitUntil(()=>$('.active').length === $('.coupon-wrap').length);

	timeStamp.forEach((date, i) => (date > 0) && stamping(i, date));
}
window.parent.stopLoading(500);
})()

