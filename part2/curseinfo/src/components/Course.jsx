const Course = ({ course }) => {
    return (

        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    );
};

const Header = ({ name }) => {
    return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
    return (
        <>
            {
                parts.map((part) => (
                    <Part key={part.id} part={part} />
                ))
            }
            <Total parts={parts} />
        </>
    );
};


const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    return (
        <b>
            Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </b>
    )
}

export default Course;