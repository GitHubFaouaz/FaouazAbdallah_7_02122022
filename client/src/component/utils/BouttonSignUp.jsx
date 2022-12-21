import { useEffect, useState } from "react";
import { createElement } from "react";

const Button = () => {
  const banner = document.getElementsByClassName("banner")[0];
  //   const blocks = document.getElementsByClassName("blocks");
  /* function createMarkup() {
    for (let i = 1; i < 5; i++) {
      const div = "<div class='blocks'></div> "; //la boucle envoie autant de carré necessaire  pour tout la page
      //   const duration = Math.random() * 5; //chaque numero aleatoire de math.rom
      //   blocks[i].style.animationDuration = duration + "s";

      //   const div = createElement("div", { className: "blocks" }, "abdallah");

      return { __html: div, div };
    }
  }*/

  function CreateBlocks() {
    const [number, setNumber] = useState(150);
    for (let i = 1; i < number; i++) {
      const blocks = createElement("div", { className: "blocks" }, "button");
      // setNumber(number + i);
      useEffect(() => {
        setNumber(number + i);
      }, []); //number

      return blocks;
    }
  }

  return (
    // <div className="banner" dangerouslySetInnerHTML={createMarkup()}>
    <div className="banner">
      <CreateBlocks />
    </div>
  );
};

export default Button;
