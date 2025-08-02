import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section data-testid="about-page">
        <h1>Hi, my name is Aleh</h1>
        <span>I`&lsquo;m originally from Belarus, but now live in Poland</span>
        <br />
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React Course
        </a>
      </section>

      <Link to={'/'}>Go to home page</Link>
    </>
  );
};

export default About;
