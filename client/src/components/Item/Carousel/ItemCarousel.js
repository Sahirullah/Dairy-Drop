import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css'

const ProductCarousel = (props) => {
  // Check if item and images exist
  if (!props.item || !props.item.image || props.item.image.length === 0) {
    return (
      <div className="product__carousel__container">
        <div className="product__carousel">
          <div className="no-image-placeholder">No images available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        <Carousel variant="dark" interval={4000}>
          {props.item.image.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <div className="carousel__image__container">
                <img
                  className="carousel__image"
                  src={imageUrl}
                  alt={`${props.item.name} - ${index + 1}`}
                  onError={(e) => {
                    e.target.src = '/placeholder.png';
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ProductCarousel;
