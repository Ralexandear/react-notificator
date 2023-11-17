import React from "react";

export default function Header () {
  return (
    <div class="d-flex justify-content-between align-items-center mb-5">
      <img src="orderForm/icon/notificatorLogo.svg" alt="OleandriaApps"  id="notificatorLogo" />
      <nav class="navbar bg-body-tertiary m-0">
        <div class="container d-flex" id="nav__container">
          <div class="nav container nav-pills" id="nav-tab" role="tablist">
            <button class="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">🧪 Лабомат</button>
            <button class="nav-link"  data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">🦠 Антиген</button>
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">👩‍🔬 Cito</button>
            <button class="nav-link active" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">🛴 Самокат</button>
          </div>  
        </div>
      </nav>
      <button type="button" class="btn btn-outline-success">Success</button>
    </div>
  )
}