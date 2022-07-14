import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const WaiverForm = () => {
  const company = "Hopper";
  const state = "New York";

  return (
    <section>
      <h1>ACCIDENT WAIVER AND RELEASE OF LIABILITY FORM</h1>
      <p>
        I (and/or my child) am participating in a {company} event on the date(s) specified
        below (“Event”) and HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING AND/OR VOLUNTEERING
        IN THIS EVENT, including by way of example and not limitation, any risks that may arise
        from negligence, gross negligence, or carelessness on the part of the persons or
        entities being released or other participants or volunteers in the event, from
        dangerous or defective equipment or property owned, maintained, or controlled by them,
        or because of any of their possible liability without fault.
      </p>
      <p>
        I am participating in this Event purely on a voluntary basis. It is for recreational
        purposes only and is not required, expected, or encouraged as a condition or part of my
        employment, school curriculum, or otherwise. I acknowledge that this Event may carry
        with it the potential for death, serious injury, and property loss. I understand these
        risks are inherent to participants in the Event, including myself. I certify that there
        are no health-related reasons or problems that preclude my participation in this Event
        and that I have not been advised to not participate in this Event, or any other
        athletic activities, by any medical professional. I acknowledge that this Release will
        be used by the Event holders and organizers, and that it will govern my actions and
        responsibilities at the Event and that it will apply equally to any future {company}{" "}
        event in which I participate, whether I am required to sign an additional release for
        such future events or not.
      </p>
      <p>
        In consideration of my application and permitting me to participate in this Event, I
        hereby agree as follows for myself, my executors, administrators, and assigns
        (“Releasing Parties”) as follows:
      </p>
      <ol>
        <li>
          I WAIVE, RELEASE, AND FOREVER DISCHARGE from any and all liability, including but not
          limited to, liability arising from the negligence or fault of the Released Parties,
          for my death, disability, personal injury, property damage, injuries from equipment
          or any other product used during the Event, property theft, torts of any kind, or
          actions of any kind which may occur to me during the Event (which shall include my
          traveling to and from this activity or event), THE FOLLOWING ENTITIES OR PERSONS:
          {company}, Inc., the owners, the employees, lessees, or sublessees of the
          property(ies) at which the Event is held, and the Event holders/hosts, including
          their managers, members, owners, directors, officers, employees, volunteers,
          representatives, agents, successors, and assigns (“Released Parties”);
        </li>
        <li>
          I WAIVE the provisions of California Civil Code Section 1542 which provides "A
          general release does not extend to claims which the creditor does not know or suspect
          to exist in his or her favor at the time of executing the release, which if known by
          him or her must have materially affected his or her settlement with the debtor," or
          any equivalent statute in my state of residence or in the state in which the Event is
          held.
        </li>
        <li>
          I INDEMNIFY, HOLD HARMLESS, AND PROMISE TO DEFEND the Released Parties from any and
          all liabilities or claims made as a result of my participation in this Event, whether
          caused by my negligence, intentional or negligent acts or omissions, or otherwise.
        </li>
      </ol>
      <p>
        I acknowledge that neither the Released Parties are responsible for the errors,
        omissions, acts, or failures to act of any party or entity conducting the Event on
        behalf of the Released Parties or that I attend through or at the invitation of the
        Released Parties. This Release, however, is not intended to discharge the Released
        Parties from liability for fraud or violation of a statutory duty.
      </p>
      <p>
        I hereby consent to receive medical treatment, which may be deemed advisable in the
        event of injury, accident, and/or illness during the Event (including during travel to
        and from the Event). For the sake of clarity, any decision or act by any Released Party
        to provide, request, or otherwise induce the provision of any medical treatment to me
        as a result of an injury, accident, or illness during the Event shall be covered by
        this Release.
      </p>
      <p>
        This Release shall be construed broadly to provide a release and waiver to the maximum
        extent permissible under applicable law. It shall be governed by {state} law.
      </p>
      <p>
        I CERTIFY THAT I HAVE READ THIS DOCUMENT, AND AM AT LEAST 18 YEARS OF AGE AND NOT A
        MINOR, AND I FULLY UNDERSTAND ITS CONTENT. I AM AWARE THAT THIS IS A RELEASE OF
        LIABILITY AND A CONTRACT THAT I AM AUTHORIZED AND COMPETENT TO SIGN IT ON BEHALF OF ALL
        RELEASING PARTIES, AND I SIGN IT OF MY OWN FREE WILL.
      </p>
      <div>
        <p>
          <b>Reservation date:</b> {}
        </p>
        <Form>
          <FormGroup>
            <Label for="name"></Label>
            <Input />
          </FormGroup>
        </Form>
      </div>
    </section>
  );
};

export default WaiverForm;
