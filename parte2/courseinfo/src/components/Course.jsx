export const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Part key={course.id} course={course} />
      ))}
    </div>
  );
};

export const Part = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>

      <h4>
        Total of Exercises:
        {course.parts.reduce((atual, acc) => atual + acc.exercises, 0)}
      </h4>
    </div>
  );
};
