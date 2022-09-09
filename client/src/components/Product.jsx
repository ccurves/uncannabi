import styled from "styled-components";
import {
  Favorite,
  FavoriteBorderOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const user = useSelector((state) => state.user.currentUser);
  const wishlist = useSelector((state) => state.wishlist.products);

  const dispatch = useDispatch();
  const handleClick = async (productId) => {
    // user !== null && updateWishlist(dispatch, user, productId);
    updateWishlist(dispatch, user, productId);
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`} className="link">
            <SearchOutlined />
          </Link>
        </Icon>
        {wishlist.some(
          (e) => JSON.stringify(e._id) === JSON.stringify(item._id)
        ) ? (
          <Icon>
            <Favorite
              style={{
                color: "#6cae75",
              }}
              onClick={() => handleClick(item._id)}
            />
          </Icon>
        ) : (
          <Icon>
            <FavoriteBorderOutlined onClick={() => handleClick(item._id)} />
          </Icon>
        )}
      </Info>
    </Container>
  );
};

export default Product;
