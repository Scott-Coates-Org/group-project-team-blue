const Logo = () => {
  const logoLetters = [...'HOPPER'];

  return (
    <div id="logo">
      {logoLetters.map((letter, i) => (
        <span>{letter}</span>
      ))}
    </div>
  );
};

export default Logo;
