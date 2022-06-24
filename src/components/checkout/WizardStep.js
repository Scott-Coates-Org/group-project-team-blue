const WizardStep = ({ stepHeader, children }) => {
  return (
    <div>
      <h3>{stepHeader}</h3>
      <div className="mb-5">{children}</div>
    </div>
  );
};

export default WizardStep;
