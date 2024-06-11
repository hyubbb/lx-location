import React from "react";

const SearchForm = () => {
  return (
    <form id='myForm' onSubmit={(e) => submitHandler(e)}>
      <input type='text' id='myInput' />
      <input type='submit' value='button' />
    </form>
  );
};

export default SearchForm;
