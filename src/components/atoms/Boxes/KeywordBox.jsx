import "styles/Hovers.css";

export const KeywordBox = ({id, keyword, onClick}) => {

    var clicked = false;

    const btnClicked = (event) => {
        onClick(event);
        if (clicked) {
            document.getElementById(id).style.backgroundColor = 'white';
            document.getElementById(id).style.color = 'black';
        } else {
            document.getElementById(id).style.backgroundColor = 'black';
            document.getElementById(id).style.color = 'white';
        }
        clicked = !clicked;
    };

    return (
        <button className="keyword-box" id={id} value={keyword} onClick={btnClicked} style={{
            border:'1px solid black',
            borderRadius: '10px',
            padding:'0 20px',
            height:'35px',
            margin: '0 15px'
        }}>
            {keyword}
        </button>
    )
};

export const GenreBox = ({id, keyword, filter, setFilter}) => {

    const btnClicked = (event) => {
        setFilter(event.target.value);
    };

    return (
        <button className="keyword-box" id={id} value={keyword} onClick={btnClicked} style={{
            border:'1px solid black',
            borderRadius: '15px',
            padding:'0 15px',
            height:'35px',
            margin: '0 15px 0 0',
            color: filter === keyword ? "white" : "black" ,
            backgroundColor: filter === keyword ? "black" : "white"
        }}>
            {keyword}
        </button>
    )
};

export const ColorfulKerwordBox = ({fontSize, margin, keyword, color}) => {
    return (
        <span style={{
            border: '0px solid',
            borderRadius: '7px',
            height: '30px',
            lineHeight:'30px',
            padding:'0 18px',
            width:'fit-content',
            backgroundColor: color,
            color: 'black',
            margin: margin,
            fontSize: fontSize
        }}>
            {keyword}
        </span>
    )
};