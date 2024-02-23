import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CardHeader from '@mui/material/CardHeader';
import { Navigation } from 'swiper/modules';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './CardSlick.css'
import { Button } from '@mui/material';
const CardSlick = ({ reviews }) => {
    const getRandomColor = () => {
        const colors = ['#E23A3A', '#2F46E5', 'green', 'purple', 'orange', '#1BAAAF'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
 
    return (
        <div className="CardSlick">
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} spaceBetween={16} className="mySwiper">
                {reviews?.map((review, index) => (
                    <SwiperSlide key={index}>
                        <CardHeader avatar={
                            <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
                                {review.fullName[0]}
                            </Avatar>
                        }
                            // action={
                            //     <IconButton aria-label="settings">
                            //         <MoreVertIcon />
                            //     </IconButton>
                            // }
                            title={review.fullName}
                            subheader={review.reviewDate}
                        />
                        <div className="card-content">
                            <h5 className="CardSlick-desrcibe">{review.content}</h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                        <span className="card-rating">{review.rating}</span>
                    </SwiperSlide>))}
            </Swiper>
        </div>
    )
}

export default CardSlick