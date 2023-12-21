import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CardHeader from '@mui/material/CardHeader';
import { Navigation } from 'swiper/modules';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, blueGrey, green, red, deepOrange, grey, yellow } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './CardSlick.css'
import { Button } from '@mui/material';
const CardSlick = () => {
    return (
        <div className="CardSlick">
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} className="mySwiper">
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                M
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Minh"
                            subheader="October 20, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tới.</h5>
                            <Button size="small">Đọc thêm</Button>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                H
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Hậu"
                            subheader="June 2, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Large room, good location close to beach with a good rooftop swimming pool which we used every day. Nice rain shower in the bathroom and breakfast was good considering only $40 Australian dollars per night for two people included in the price. Good secure entrance door lock on the room. Bed and pillows were very comfortable.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Ronalda"
                            subheader="September 30, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Đó là một nơi tuyệt vời với mọi thứ bạn cần để có một kỳ nghỉ thoải mái xa nhà. Cô nhân viên ở quầy tiếp tân, Yến, rất nhiệt tình và tôi muốn cảm ơn cô ấy một lần nữa! Phòng của tôi rộng rãi và rất sạch sẽ. Từ cửa sổ có thể nhìn thấy biển, chỉ mất khoảng 5-6 phút đi bộ đến bãi biển. Hồ bơi trên mái và khu vườn rất đẹp. Tôi cũng thử Sana một đêm, rất ngon! Tôi sẽ khuyến nghị khách sạn này cho bất kỳ ai đến Đà Nẵng.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                T
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Tùng"
                            subheader="July 11, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Nhân viên thật tuyệt vời! Rất nhiệt tình và thân thiện. Khách sạn rất sạch sẽ và phòng rộng lớn, đầy đủ mọi thứ chúng tôi cần.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                Đ
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Đạt"
                            subheader="March 25, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Mọi thứ đều tốt và như mong đợi. Chỗ nghĩ có sẵn tủ lớn để giữ hành lí qua ngày và tự lấy chìa khóa tủ rất tiện nghi. Tuy là dạng căn hộ nhưng vẫn có các chị vào dọn vệ sinh và thay ga giường rất sạch sẽ.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                                L
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Long"
                            subheader="October 2, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tới.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="Card-header">
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: yellow[500] }} aria-label="recipe">
                                A
                            </Avatar>
                        }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="An"
                            subheader="October 20, 2023"
                        />
                        <div>
                            <h5 className="CardSlick-desrcibe">Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tới.</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CardSlick