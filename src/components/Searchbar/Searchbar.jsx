import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState("");

  const onNameChange = (e) => {
    setSearchName(e.currentTarget.value);
  };

  const onSubmitSearchbar = (e) => {
    e.preventDefault();
    onSubmit(searchName);
    setSearchName("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitSearchbar}>
        <input
          className={s.SearchFormInput}
          type="text"
          value={searchName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onNameChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
