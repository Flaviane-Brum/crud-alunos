const DataTable = {
  arrayData: [
    {
      nome: "Fulano",
      telefone: "99999-9999",
      dataNascimento: "29/03/1989",
      nota1: 5,
      nota2: 8,
      nota3: 6,
    },
  ],
  addDataTable(data) {
    DataTable.arrayData.push(data);
    App.reload();
  },
  removeDataTable(index) {
    DataTable.arrayData.splice(index, 1);
    App.reload();
  },
};
const DOM = {
  containerTbody: document.querySelector("#table-aluno tbody"),

  addData(data, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLData(data, index);
    DOM.containerTbody.appendChild(tr);
    tr.dataset.index = index;
  },

  innerHTMLData(data, index) {
    let media = (
      (Number(data.nota1) + Number(data.nota2) + Number(data.nota3)) /
      3
    ).toFixed(1);
    let CSSclass = media >= 5 ? "aluno-aprovado" : "aluno-reprovado";

    const html = ` 
      <td  >${data.nome}</td>
      <td >${data.telefone}</td>
      <td >${data.dataNascimento}</td>
      <td  class=${CSSclass}>${media}</td>
      <td>
        <button class="remove" aria-label="Remover aluno" onclick="DataTable.removeDataTable(${index})">
          <i class="fas fa-trash-alt fa-lg" ></i>
        </button>
      </td>
    `;
    return html;
  },

  clearData() {
    DOM.containerTbody.innerHTML = "";
  },
};

const Utils = {
  formatNumberField(value) {
    value = Number(value.replace(/\,\./g, ""));
    return value;
  },
  formatDateField(data) {
    const splittedDate = data.split("-");
    return `${splittedDate[2]}/ ${splittedDate[1]} /${splittedDate[0]}`;
  },
  formatTelField(tel) {
    const text = tel;
    let formatedText = text.replace(/\-/g, "");
    const isCelular = text.length === 9;
    if (isCelular) {
      const parte1 = text.slice(0, 5);
      const parte2 = text.slice(5, 9);
      formatedText = `${parte1}-${parte2}`;
    } else {
      const parte1 = text.slice(0, 4);
      const parte2 = text.slice(4, 8);
      formatedText = `${parte1}-${parte2}`;
    }

    return formatedText;
  },
};
const App = {
  init() {
    DataTable.arrayData.forEach((data, index) => {
      DOM.addData(data, index);
    });
  },
  reload() {
    DOM.clearData();
    App.init();
  },
};
const Form = {
  nome: document.querySelector("input#nome"),
  telefone: document.querySelector("input#telefone"),
  dataNascimento: document.querySelector("input#dataNascimento"),
  nota1: document.querySelector("input#nota1"),
  nota2: document.querySelector("input#nota2"),
  nota3: document.querySelector("input#nota3"),

  getValues() {
    return {
      nome: Form.nome.value,
      telefone: Form.telefone.value,
      dataNascimento: Form.dataNascimento.value,
      nota1: Form.nota1.value,
      nota2: Form.nota2.value,
      nota3: Form.nota3.value,
    };
  },
  formatValues() {
    let { nome, telefone, dataNascimento, nota1, nota2, nota3 } =
      Form.getValues();
    nota1 = Utils.formatNumberField(nota1);
    nota2 = Utils.formatNumberField(nota2);
    nota3 = Utils.formatNumberField(nota3);
    telefone = Utils.formatTelField(telefone);
    dataNascimento = Utils.formatDateField(dataNascimento);
    return {
      nome,
      telefone,
      dataNascimento,
      nota1,
      nota2,
      nota3,
    };
  },
  validateFields() {
    const { nome, telefone, dataNascimento, nota1, nota2, nota3 } =
      Form.getValues();

    if (
      nome.trim() === "" ||
      telefone.trim() === "" ||
      dataNascimento.trim() === "" ||
      nota1.trim() === "" ||
      nota2.trim() === "" ||
      nota3.trim() === ""
    ) {
      throw new Error("Por favor preencha todos os campos");
    } else {
      alert("Aluno cadastrado com sucesso!");
    }
  },
  clearFields() {
    Form.nome.value = "";
    Form.telefone.value = "";
    Form.dataNascimento.value = "";
    Form.nota1.value = "";
    Form.nota2.value = "";
    Form.nota3.value = "";
  },
  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const formatedData = Form.formatValues();
      DataTable.addDataTable(formatedData);
      Form.clearFields();
    } catch (error) {
      alert(error.message);
    }
  },
};
App.init();
