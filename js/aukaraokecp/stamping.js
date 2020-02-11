const dtToStr = in_dt => {
	dt = new Date(in_dt)
	let year = String(dt.getFullYear()).padStart(4, 0)
	let month = String(dt.getMonth() + 1).padStart(2, 0)
	let date = String(dt.getDate()).padStart(2, 0)
	let hour = String(dt.getHours()).padStart(2, 0)
	let minute = String(dt.getMinutes()).padStart(2, 0)
	let second = String(dt.getSeconds()).padStart(2, 0)
	return year+month+date+hour+minute+second
} 

const stamping = (coupon_id) => {
	let dt1 = new Date()
	let sdt1 = dtToStr(dt1)
	let dt2 = dt1.setMinutes(dt1.getMinutes() + 30)
	let sdt2 = dtToStr(dt2)
	let stamped = `<img src="/utapre.auone.jp/images/aukaraokecp/coupon_sumi.png" alt="済_ご利用ありがとうございました。" width="240" class="mar_t_25">
    <div class="coupon_sumi_date mar_t_20">
        <p>利用開始日時</p><span>${sdt1}</span><br>
        <p class="mar_t_5">利用終了日時</p>
        <span>${sdt2}</span><br>
        <p class="mar_t_10"></p>
    </div>`;
	let couponZone = document.getElementById(coupon_id);
	couponZone.removeEventListener("click", event);
	couponZone.innerHTML = stamped;
}

