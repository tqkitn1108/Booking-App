import "./trending.css";
import "./trending-responsive.css";
import { useNavigate } from "react-router-dom";
const Trending = () => {
    const navigate = useNavigate();
    function handleSearch(dest) {
        const location = dest.replaceAll(' ', '%20');
        navigate(`/hotels/search?location=${location}&page=0&size=3`);
    }

    return (
        <div className="trending">
            <div className="trending-top" onClick={() => handleSearch('Hà Nội')}>
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=" alt="" className="trending-img" />
                <div className="trending-title">
                    <div className="trending-title-des">
                        <span className="dest-name">Hà Nội</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="" className="trending-title-img" />
                    </div>
                </div>
            </div>
            <div className="trending-top" onClick={() => handleSearch('TP. Hồ Chí Minh')}>
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=" alt="" className="trending-img" />
                <div className="trending-title">
                    <div className="trending-title-des">
                        <span className="dest-name">TP. Hồ Chí Minh</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="" className="trending-title-img" />
                    </div>

                </div>
            </div>
            <div className="trending-bottom" onClick={() => handleSearch('Hội An')}>
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=" alt="" className="trending-img" />
                <div className="trending-title">
                    <div className="trending-title-des">
                        <span className="dest-name">Hội An</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="" className="trending-title-img" />
                    </div>
                </div>
            </div>
            <div className="trending-bottom" onClick={() => handleSearch('Đà Nẵng')}>
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=" alt="" className="trending-img" />
                <div className="trending-title">
                    <div className="trending-title-des">
                        <span className="dest-name">Đà Nẵng</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="" className="trending-title-img" />
                    </div>
                </div>
            </div>
            <div className="trending-bottom" onClick={() => handleSearch('Ninh Bình')}>
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/640445.jpg?k=50b44df6e3029c95c1874da1ae9634d62ac2264961b917271d56d7637ccb059c&o=" alt="" className="trending-img" />
                <div className="trending-title">
                    <div className="trending-title-des">
                        <span className="dest-name">Ninh Bình</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="" className="trending-title-img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending