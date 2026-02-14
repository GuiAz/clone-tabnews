import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmail();

    await email.send({
      from: "GuiCottas <contato@guicottas.com.br>",
      to: "contato@curso.dev",
      subject: "teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "GuiCottas <contato@guicottas.com.br>",
      to: "contato@curso.dev",
      subject: "Último email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@guicottas.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
