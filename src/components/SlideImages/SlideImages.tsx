import Slider from "react-slick";

interface SlideImagesProps {
    images: string[]; // Define que images é uma lista de strings
}

const SlideImages: React.FC<SlideImagesProps> = ({ images }) => {
    // Configuração do slider
    const settings = {
        dots: true, // Mostra os pontos de navegação
        infinite: true, // Loop infinito
        speed: 5000, // Velocidade de transição (em ms)
        slidesToShow: 1, // Número de slides exibidos
        slidesToScroll: 1, // Número de slides que mudam por vez
        autoplay: true, // Passa automaticamente
        autoplaySpeed: 500, // Meio segundo por slide
        pauseOnHover: true, // Pausa o autoplay quando o mouse passa sobre o slider
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover", // Ajusta a imagem para cobrir o espaço do slide
                            borderRadius: "8px", // Apenas se desejar bordas arredondadas
                        }}
                    />

                </div>
            ))}
        </Slider>
    );
};

export default SlideImages;
