import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Card.css';
import Stack from '@mui/material/Stack';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
   // Adjust the height as needed
});
export default function CardReview() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleExpandClick = (i) => {
    setExpanded(i);
    setOpen(true);
  };

  return (
    <CenteredContainer>
    <Stack direction="row" spacing={2} className='"hotelCard'>
    <Card  sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          setOpen
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          <Typography paragraph>
            
Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tớ
          </Typography>
          
        </CardContent>

      </Collapse>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[50] }} aria-label="recipe">
            H
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Ha"
        subheader="September 14, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          <Typography paragraph>
            
Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tớ
          </Typography>
          
        </CardContent>

      </Collapse>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[550] }} aria-label="recipe">
            Đ
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Dat"
        subheader="June 2, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Mọi thứ đều tốt và như mong đợi. Chỗ nghĩ có sẵn tủ lớn để giữ hành lí qua ngày và tự lấy chìa khóa tủ rất tiện nghi.
        Tuy là dạng căn hộ nhưng vẫn có các chị vào dọn vệ sinh và thay ga giường rất sạch sẽ :)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          <Typography paragraph>
            
Phòng rộng, thoải mái và tiện nghi. Vị trí địa lý tuyệt vời và đặc biệt các bạn nhân viên hỗ trợ tôi rất nhiệt tình. Tôi cảm thấy được chào đón tại đây. Đây sẽ là địa điểm nơi ở tôi khuyên các bạn nên tới. Ở đây toàn bộ nhân viên đều có thể nói tiếng anh tốt và dễ thương. Khu vực ăn uống sầm uất rất nhiều món nổi tiếng. Tôi sẽ quay lại vào thời gian tớ
          </Typography>
          
        </CardContent>

      </Collapse>
    </Card>
    </Stack>
    </CenteredContainer>
  );
}