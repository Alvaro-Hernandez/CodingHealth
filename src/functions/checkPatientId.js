import { db } from "../services/FirebaseServices";

export const checkPatientId = async (
  idInput,
  onSuccess,
  onNotFound,
  onError
) => {
  try {
    const doc = await db.collection("cartilla").doc(idInput).get();

    if (doc.exists) {
      onSuccess(idInput);
    } else {
      onNotFound();
    }
  } catch (error) {
    console.log("Entrando al bloque catch");
    console.error("Error al buscar el ID:", error);
    console.log("Llamando a onError");
    onError();
    console.log("Después de llamar a onError");
  }
};
