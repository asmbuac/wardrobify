function MainPage() {
  return (
    <>
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between text-center text-sm-start px-4 py-5 my-5">
          <div>
            <h1 className="display-5 fw-bold">WARDROBIFY!</h1>
            <p className="lead mb-4">
              Need to keep track of your <strong className="text-info-emphasis">shoes</strong> and <strong className="text-warning-emphasis">hats</strong>?
              <br />
              We have the solution for you!
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-vector/woman-choose-clothes-wardrobe_107791-12235.jpg?w=2000&t=st=1678069298~exp=1678069898~hmac=9033c739a099c5bdf62f8f80869f01a2b6a58a879a5d476a249db52122c505a8"
            className="img-fluid w-50 d-none d-sm-block"
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
