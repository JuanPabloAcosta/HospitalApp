import React from "react";
import PropTypes from "prop-types";
import Pagination from "../../shared/Pagination/Pagination";
import Preloader from "../../shared/Preloader/Preloader";
import { HttpClient, UserService } from "../../../services/index";

class MedicalAppointments extends React.Component {
  constructor() {
    super();
    this.state = {
      firstTimeDataLoaded: false,
      dataLoaded: false,
      pagy: {},
      payments: []
    };

    this.handleLoadPayments = this.handleLoadPayments.bind(this);
    this.handleInitialLoad = this.handleInitialLoad.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.handlePaymentDeletion = this.handlePaymentDeletion.bind(this);
  }

  componentDidMount() {
    $(".collapsible").collapsible();
  }

  async handleLoadPayments(page) {
    const result = await HttpClient.getUrl(
      "/core/clients/" + this.props.clientId + "/client_payments.json",
      {
        by_client: this.props.clientId,
        page: page
      }
    );
    const data = await result.json();
    this.setState({
      dataLoaded: true,
      pagy: data.pagy,
      payments: data.data
    });
  }

  async handleInitialLoad() {
    if (!this.state.firstTimeDataLoaded) {
      this.setState({ dataLoaded: false });
      await this.handleLoadPayments(1);
      this.setState({
        firstTimeDataLoaded: true
      });
    }
  }

  async handlePaymentDeletion(paymentId) {
    Swal.fire({
      title: "¿Esta seguro de eliminar este pago?",
      text: "No hay manera de recuperarlo después",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar pago",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        await this.deletePayment(paymentId);
        Swal.fire("¡Exito!", "Tu pago ha sido borrado", "success");
      }
    });
  }

  async deletePayment(paymentId) {
    await HttpClient.deleteUrl(
      `/core/clients/${this.props.clientId}/client_payments/${paymentId}`
    );
    this.setState({ dataLoaded: false });
    await this.handleLoadPayments(1);
  }

  renderPreloader() {
    if (!this.state.dataLoaded) {
      return <Preloader></Preloader>;
    } else {
      return null;
    }
  }

  renderDeleteButton(payment) {
    const deleteLinkClassName =
      "btn btn-small waves-effect waves-light red darken-2";
    if (UserService.hasRole("admin")) {
      return (
        <a
          className={deleteLinkClassName}
          onClick={() => {
            this.handlePaymentDeletion(payment.id);
          }}
        >
          <i className="material-icons">cancel</i>
        </a>
      );
    } else {
      return null;
    }
  }

  renderTableHeaders() {
    return (
      <thead>
        <tr>
          <th>Fecha de pago</th>
          <th>Concepto</th>
          <th>Monto</th>
          <th>Número Factura</th>
          <th>Detalle</th>
        </tr>
      </thead>
    );
  }

  renderTableContent() {
    const payments = this.state.payments;
    const linkClassName =
      "btn btn-small waves-effect waves-light blue darken-2";
    const content = payments.map((payment, index) => {
      return (
        <tr key={index}>
          <td>{payment.payment_date}</td>
          <td>{payment.concept}</td>
          <td>{payment.amount}</td>
          <td>{payment.invoice_number}</td>
          <td>
            <a
              className={linkClassName}
              href={`${window.location.origin}/payments/${payment.id}`}
            >
              <i className="material-icons">visibility</i>
            </a>
            {this.renderDeleteButton(payment)}
          </td>
        </tr>
      );
    });
    return <tbody>{content}</tbody>;
  }

  renderTable() {
    return (
      <table className="striped centered">
        {this.renderTableHeaders()}
        {this.renderTableContent()}
      </table>
    );
  }

  renderContent() {
    if (this.state.dataLoaded) {
      return (
        <React.Fragment>
          {this.renderTable()}
          <Pagination
            pagy={this.state.pagy}
            pageChanged={this.pageChanged}
          ></Pagination>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  pageChanged(newPage) {
    this.handleLoadPayments(newPage);
  }

  render() {
    return (
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header" onClick={this.handleInitialLoad}>
            Citas disponibles
          </div>
          <div className="collapsible-body">
            {this.renderPreloader()}
            {this.renderContent()}
          </div>
        </li>
      </ul>
    );
  }
}

MedicalAppointments.propTypes = {
  clientId: PropTypes.string
};
export default MedicalAppointments;
