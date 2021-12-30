const colors = [
    "darkblue",
    "#89bef7",
    "#9bb021",
    "#fdc933",
    "#060bda",
    "#b8631c",
    "pink",
    "red",
    "orange",
];

export const Palette = ({ handleColorChange }) => (
    <div className="palette-container ">
        <button className="icon-button">
            <div className="color-palette" id="color-palette-icon">
                <i title="change color" className="fas fa-palette"></i>
            </div>
        </button>
        <div className="palette-colors-container">
            {colors.map((color, i) => (
                <div
                    key={i}
                    id={`color-${i}`}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    </div>
);
