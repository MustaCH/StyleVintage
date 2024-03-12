import React from "react";

function FAQS() {
  return (
    <div className="lg:ps-28">
      <div className="mb-24 lg:mb-0 lg:ps-12 flex flex-col gap-12">
        <h1 className="ps-8 lg:ps-0 text-5xl font-bold text-black  pt-12">
          Preguntas frecuentes
        </h1>
        <div className="flex flex-col gap-12 text-black px-8">
          <details>
            <summary className="text-xl lg:text-2xl text-black/80">
              How do I know when my order will arrive?
            </summary>
            <p className="lg:w-1/2 pt-4">
              Once you have made your purchase we will send you an email with
              the details of your order where you will have an order code as
              well as a tracking code. With this code you will be able to verify
              the path of your purchase by entering the link that we leave you
              in the same email.
            </p>
          </details>
          <details>
            <summary className="text-xl lg:text-2xl text-black/80">
              Which shipping company do you ship through?
            </summary>
            <p className="lg:w-1/2 pt-4">
              All our shipments are made by UPS. We rely on their efficiency and
              security when delivering packages. However, in case of any change
              in the shipping company for a particular purchase or for external
              or internal reasons of our company, this change will be informed
              to you so that you are aware of it.
            </p>
          </details>
          <details>
            <summary className="text-xl lg:text-2xl text-black/80">
              In case the size I selected is incorrect.
              <br /> Can I return or change it?
            </summary>
            <p className="lg:w-1/2 pt-4">
              Unfortunately we have a strict no returns policy, however you can
              always exchange your product for another of the same or higher
              value and pay the difference in case the size does not fit or the
              product does not suit you.
            </p>
          </details>
          <details>
            <summary className="text-xl lg:text-2xl text-black/80">
              Is there a direct means of communication with
              <br /> you that I can access if there is a problem?
            </summary>
            <p className="lg:w-1/2 pt-4">
              Of course! You can communicate with us by{" "}
              <a href="https://wa.me/1111111111" className="underline">
                Whatsapp
              </a>
              , you can also send us an email to{" "}
              <a href="mailto:support@nxbo.com" className="underline">
                support@nxbo.com
              </a>
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export default FAQS;
