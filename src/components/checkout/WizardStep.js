const WizardStep = ({ stepHeader, children }) => {
  return (
    <div>
      <h3>{stepHeader}</h3>
      <div>{children}</div>
    </div>
  );
};

export default WizardStep;
