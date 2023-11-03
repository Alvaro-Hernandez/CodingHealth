import { db } from "../services/FirebaseServices";
import { checkPatientId } from "../functions/checkPatientId";

jest.mock("../services/FirebaseServices");

describe("Función checkPatientId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("llama a onSuccess cuando el documento existe", async () => {
    const docData = { exists: true };
    db.collection().doc().get.mockResolvedValueOnce(docData);

    const onSuccess = jest.fn();
    const onNotFound = jest.fn();
    const onError = jest.fn();

    await checkPatientId("testId", onSuccess, onNotFound, onError);
    expect(onSuccess).toHaveBeenCalledWith("testId");
    expect(onNotFound).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("llama a onNotFound cuando el documento no existe", async () => {
    const docData = { exists: false };
    db.collection().doc().get.mockResolvedValueOnce(docData);

    const onSuccess = jest.fn();
    const onNotFound = jest.fn();
    const onError = jest.fn();

    await checkPatientId("testId", onSuccess, onNotFound, onError);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onNotFound).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("llama a onError en caso de error", async () => {
    db.collection()
      .doc()
      .get.mockRejectedValueOnce(new Error("Error en Firebase"));

    const onSuccess = jest.fn();
    const onNotFound = jest.fn();
    const onError = jest.fn();

    console.log("Antes de llamar a checkPatientId");
    await checkPatientId("testId", onSuccess, onNotFound, onError);
    console.log("Después de llamar a checkPatientId");

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onNotFound).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });

  it("llama a onError cuando se proporciona un ID inválido", async () => {
    const onSuccess = jest.fn();
    const onNotFound = jest.fn();
    const onError = jest.fn();

    await checkPatientId("", onSuccess, onNotFound, onError);

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onNotFound).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});
