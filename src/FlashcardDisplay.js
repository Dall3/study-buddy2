function Display(props) {
    const showFlashcard = (item) => {
        return (
            <div>
                <p>Question: {item.question}</p>
                <p>Answer: {item.answer}</p>
            </div>
        );
    };

    return <div>{props.items.map(showFlashcard)}</div>
}

export default Display;