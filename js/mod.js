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

const stamping = ($target) => {
	const dt1 = new Date();
	const dt2 = new Date(+dt1+1800000);
	const sdt1 = dtToStr(dt1);
	const sdt2 = dtToStr(dt2);
	const stamped = `<img src="/images/aukaraokecp/coupon_sumi.png" alt="済_ご利用ありがとうございました。" width="240" class="mar_t_25"> <div class="coupon_sumi_date mar_t_20"> <p>利用開始日時</p><span>${sdt1}</span><br><p class="mar_t_5">利用終了日時</p><span>${sdt2}</span><br><p class="mar_t_10"></p></div>`;
	$target.find('.mog-sumi').html(stamped);
}

const paraLoad = time => {
	const $loadback = $('.loadback').removeClass('noloading');
	setTimeout(()=>{
		$loadback.addClass('noloading');
		scrollTo(0,0);
	}, time);
}

{
	const dt1 = new Date();
	const dt2 = new Date(+dt1+86400000);
	const sdt1 = dtToStr2(dt1);
	const sdt2 = dtToStr2(dt2);
	$('.coupon_status_bg_list').html(`${sdt1}オープンから<br>${sdt2} AM7時まで`);
	$('#checkin').attr('action', 'javascript:void(0)').on('submit', ()=>{
		const num = +$('#checkin_coupon_type').val() - 1;
		const $target = $('.coupon-wrap').eq(num).off();
		paraLoad(500);
		stamping($target);
	})

	$('body').prepend('<style>.loadback, .loadback *{position: relative; margin: 0; padding: 0; border: 0;}.noloading{visibility: hidden;}.loadback{display: table; position: fixed; top: 0; left: 0; width: 100vw; height: auto; min-height: 100vh; background-color: #EEEEEE;text-align: center;z-index: 97;}.loadblock{display: table-cell; z-index: 98; vertical-align: middle; font-weight: bold; margin: 0;}.loadfont{z-index: 100;}.loadgif{z-index: 99; width: 4rem; height: 4rem; animation: r1 1s linear infinite; line-height: 0;}@keyframes r1{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style> <div class="loadback noloading"> <span class="loadblock"> <p class="loadfont">読み込み中</p><img class="loadgif" src="data:image/gif;base64,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"/> </span> </div>');
	paraLoad(10);
}

