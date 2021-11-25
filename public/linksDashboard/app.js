let data = null;
const workshopsName = {
  "workshop-1": "IT track",
  "workshop-2": "Marketing track",
  "workshop-3": "Supply chain track",
  "workshop-4": "Sales track",
  "workshop-5": "Digital track",
  "workshop-6": "Finance track",
  "workshop-7": "HR track",
};
const getDetails = () => {
  return new Promise(async (res, rej) => {
    try {
      const doc = await app
        .firestore()
        .collection("backStage")
        .doc("staticData")
        .get();
      if (doc.exists) {
        res(doc.data());
      } else {
        rej({ code: "No such document" });
      }
    } catch (err) {
      alert(err.code);
      rej(err);
    }
  });
};
const updateLink = (key) => {
  if (document.getElementById(`${key}`).value === "") {
    alert(`${workshopsName[`${key}`]} can not have empty link`);
    return;
  }
  return new Promise(async (res, rej) => {
    try {
      data = {
        ...data,
        BreakoutRoomHotspot: {
          ...data.BreakoutRoomHotspot,
          [`${key}`]: {
            ...data.BreakoutRoomHotspot[`${key}`],
            link: document.getElementById(`${key}`).value,
          },
        },
      };
      await app
        .firestore()
        .collection("backStage")
        .doc("staticData")
        .update(data);
      alert(`${workshopsName[`${key}`]} link updated successfully`);
      res(data);
    } catch (err) {
      alert(err.code);
      rej(err);
    }
  });
};

const getter = async () => {
  data = await getDetails();
  document.getElementById("audi").value = data.AudiData.link;
  Object.keys(data.BreakoutRoomHotspot)
    .sort()
    .forEach((keys) => {
      //Getting all links ->
      document.getElementById(`${keys}`).value =
        data.BreakoutRoomHotspot[`${keys}`].link;

      //Adding labels ->
      const label = document.createElement("label");
      document
        .querySelector(`#cont-${keys}`)
        .insertBefore(label, document.getElementById(`${keys}`));
      label.setAttribute("for", `${keys}`);
      label.innerHTML = workshopsName[`${keys}`];

      //Creating buttons for link update ->
      const button = document.createElement("button");
      button.innerHTML = `${workshopsName[`${keys}`]} - update`;
      document.querySelector(`#cont-${keys}`).appendChild(button);

      //Adding event listener ->
      button.addEventListener("click", async () => {
        await updateLink(keys);
      });
    });
};

document.getElementById("audi-button").addEventListener("click", async () => {
  try {
    data = {
      ...data,
      AudiData: {
        link: document.getElementById("audi").value,
      },
    };
    await app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .update(data);
    alert("Audi link updated successfully");
  } catch (err) {
    alert(err.code);
  }
});
