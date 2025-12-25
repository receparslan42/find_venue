import Header from "./Header";

// Component to display the About page with a header
export default function About() {
  return (
    <>
      <Header
        headerText="About This Project"
        slogan="Find Venue web application built for learning"
      />
      <main className="container mt-4 mb-5">
        <section>
          <h2>What is this project?</h2>
          <p>
            This GitHub project is a full stack web application called
            <strong> Find Venue</strong>. It is built with a Node.js and Express
            backend and a React frontend. The aim of the project is to learn and
            demonstrate modern web technologies while building a real, useful
            application.
          </p>
        </section>

        <section className="mt-4">
          <h3>What does Find Venue do?</h3>
          <p>
            Find Venue helps users discover cafés, restaurants and other places
            to visit. You can view details about venues, see ratings, read
            comments and share your own experiences so that others can benefit.
          </p>
        </section>

        <section className="mt-4">
          <h3>About the developer</h3>
          <p>
            This project is developed and maintained by Recep Arslan as part of
            web technologies and programming studies.
          </p>
        </section>

        <section className="mt-5">
          <h3 className="mb-4">Get in Touch</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <a
              href="https://github.com/receparslan42/find_venue"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
              title="GitHub Profile"
            >
              <div
                className="bg-dark text-white rounded-circle p-3 shadow"
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="black"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
            </a>
            <a
              href="mailto:receparslan965@gmail.com"
              style={{ textDecoration: "none" }}
              title="Send Email"
            >
              <div
                className="bg-danger text-white rounded-circle p-3 shadow"
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="black"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </div>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
