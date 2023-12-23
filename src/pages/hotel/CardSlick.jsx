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
const CardSlick = ({ reviews }) => {
    return (
        <div className="CardSlick">
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} className="mySwiper">
                {reviews?.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="Card-header">
                            <CardHeader avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {review.fullName[0]}
                                </Avatar>
                            }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={review.fullName}
                                subheader={review.reviewDate}
                            />
                            <div>
                                <h5 className="CardSlick-desrcibe">{review.content}</h5>
                                <Button size="small">Đọc thêm</Button>
                            </div>
                        </div>
                    </SwiperSlide>))}
            </Swiper>
        </div>
    )
}

export default CardSlick