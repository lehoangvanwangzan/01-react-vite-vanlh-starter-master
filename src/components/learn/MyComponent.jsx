
//fragmaent
import './style.css';
const MyComponent = () => {
    // const hoang = 25;
    // const hoang = " le hoang van";
    // const hoang = true; 
    // const hoang = undefined;    
    // const hoang = null;
    const hoang = [1, 2, 3, 4, 5];
    // const hoang = { name: "le hoang van", age: 25 };

    return (
        <>
            <div> {hoang.age} van ^ tech shop 1234</div>
            <div>{JSON.stringify(hoang)} van tech shop 9999</div>

            <div className="child" style={{ borderRadius: "10xp" }}> Lê Hoàng Văn update</div>
        </>
    );
}

export default MyComponent