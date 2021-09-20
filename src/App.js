import { useState, useEffect } from "react";

import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import FetchApi from "./services/";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bigModalImage, setBigModalImage] = useState("");
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    if (searchName === "") {
      return;
    }
    setIsLoading(true);
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const loadImages = async () => {
    const fetchImages = await FetchApi(searchName, page);

    if (fetchImages.length === 0) {
      alert("Sorry. Nothing found ");
      setIsLoading(false);
      return;
    }

    setImages(fetchImages);
    setPage((prevState) => prevState + 1);
    setIsLoading(false);
  };

  const onLoadMoreImages = async () => {
    setIsLoading(true);
    const images = await FetchApi(searchName, page);

    if (images.length !== 0) {
      setImages((prevState) => [...prevState, ...images]);
      setPage((prevState) => prevState + 1);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }

    setIsLoading(false);
  };

  const onSubmit = async (newSearchName) => {
    resetDataState();
    setSearchName(newSearchName);
  };

  const resetDataState = () => {
    setImages([]);
    setSearchName("");
    setPage(1);
  };

  const findBigModalImage = (smallImage) => {
    const bigModalImage = images.find(
      (image) => image.webformatURL === smallImage
    );
    return bigModalImage.largeImageURL;
  };

  const onClickImage = (e) => {
    const bigModalImage = findBigModalImage(e.target.src);
    setBigModalImage(bigModalImage);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={bigModalImage} alt="Not found." />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {images.length !== 0 && <Button onClick={onLoadMoreImages} />}
    </>
  );
}
