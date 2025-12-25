// Display the main header section of the webpage
export default function Header({ headerText, slogan }) {
  return (
    <header>
      <div className="page-header">
        <div className="row">
          <div className="col-lg-6">
            <h1>
              {headerText} {/* Display the main header text */}
              <br />
              <small>{slogan}</small> {/* Display the slogan in smaller text */}
            </h1>{" "}
          </div>
        </div>
      </div>
    </header>
  );
}
