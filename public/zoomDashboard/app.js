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
  document.getElementById("AudiZoomLink").value = data.AudiZoomLink.link;
  document.getElementById("SA_FNQ").value =
    data.BreakoutRoomsHotspot.SA_FNQ.link;

  document.getElementById("NZ").value = data.BreakoutRoomsHotspot.NZ.link;
  document.getElementById("WA").value = data.BreakoutRoomsHotspot.WA.link;
  document.getElementById("QLD").value = data.BreakoutRoomsHotspot.QLD.link;
  document.getElementById("VIC_TAS").value =
    data.BreakoutRoomsHotspot.VIC_TAS.link;
  document.getElementById("NSW_ACT").value =
    data.BreakoutRoomsHotspot.NSW_ACT.link;

  // Object.keys(data.BreakoutRoomHotspot)
  //   .sort()
  //   .forEach((keys) => {
  //     //Getting all links ->
  //     document.getElementById(`${keys}`).value =
  //       data.BreakoutRoomHotspot[`${keys}`].link;

  //     //Adding labels ->
  //     const label = document.createElement("label");
  //     document
  //       .querySelector(`#cont-${keys}`)
  //       .insertBefore(label, document.getElementById(`${keys}`));
  //     label.setAttribute("for", `${keys}`);
  //     label.innerHTML = workshopsName[`${keys}`];

  //     //Creating buttons for link update ->
  //     const button = document.createElement("button");
  //     button.innerHTML = `${workshopsName[`${keys}`]} - update`;
  //     document.querySelector(`#cont-${keys}`).appendChild(button);

  //     //Adding event listener ->
  //     button.addEventListener("click", async () => {
  //       await updateLink(keys);
  //     });
  //   });
};

// audi zoom link update button function
document
  .getElementById("AudiZoomLink-button")
  .addEventListener("click", async () => {
    try {
      data = {
        ...data,
        AudiZoomLink: {
          link: document.getElementById("AudiZoomLink").value,
        },
      };
      await app
        .firestore()
        .collection("backStage")
        .doc("staticData")
        .update(data);
      alert("Audi Zoom Link link updated successfully");
      console.log("audi zoom link updated");
    } catch (err) {
      alert(err.code);
    }
  });

// Breakout -> SA_FNQ , update function
document.getElementById("SA_FNQ-button").addEventListener("click", async () => {
  try {
    BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
    console.log(BreakoutRoomsHotspot);
    BreakoutRoomsHotspot = {
      ...BreakoutRoomsHotspot,
      SA_FNQ: {
        link: document.getElementById("SA_FNQ").value,
      },
    };
    data = {
      ...data,
      BreakoutRoomsHotspot,
    };
    await app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .update(data);
    alert("SA_FNQ link updated successfully");
  } catch (err) {
    alert(err.code);
  }
});

// Breakout -> NZ , update function
document.getElementById("NZ-button").addEventListener("click", async () => {
  try {
    BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
    console.log(BreakoutRoomsHotspot);
    BreakoutRoomsHotspot = {
      ...BreakoutRoomsHotspot,
      NZ: {
        link: document.getElementById("NZ").value,
      },
    };
    data = {
      ...data,
      BreakoutRoomsHotspot,
    };
    await app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .update(data);
    alert("NZ link updated successfully");
  } catch (err) {
    alert(err.code);
  }
});

// Breakout -> WA , update function
document.getElementById("WA-button").addEventListener("click", async () => {
  try {
    BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
    console.log(BreakoutRoomsHotspot);
    BreakoutRoomsHotspot = {
      ...BreakoutRoomsHotspot,
      WA: {
        link: document.getElementById("WA").value,
      },
    };
    data = {
      ...data,
      BreakoutRoomsHotspot,
    };
    await app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .update(data);
    alert("WA link updated successfully");
  } catch (err) {
    alert(err.code);
  }
});

// Breakout -> QLD , update function
document.getElementById("QLD-button").addEventListener("click", async () => {
  try {
    BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
    console.log(BreakoutRoomsHotspot);
    BreakoutRoomsHotspot = {
      ...BreakoutRoomsHotspot,
      QLD: {
        link: document.getElementById("QLD").value,
      },
    };
    data = {
      ...data,
      BreakoutRoomsHotspot,
    };
    await app
      .firestore()
      .collection("backStage")
      .doc("staticData")
      .update(data);
    alert("QLD link updated successfully");
  } catch (err) {
    alert(err.code);
  }
});

// Breakout -> VIC_TAS , update function
document
  .getElementById("VIC_TAS-button")
  .addEventListener("click", async () => {
    try {
      BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
      console.log(BreakoutRoomsHotspot);
      BreakoutRoomsHotspot = {
        ...BreakoutRoomsHotspot,
        VIC_TAS: {
          link: document.getElementById("VIC_TAS").value,
        },
      };
      data = {
        ...data,
        BreakoutRoomsHotspot,
      };
      await app
        .firestore()
        .collection("backStage")
        .doc("staticData")
        .update(data);
      alert("VIC_TAS link updated successfully");
    } catch (err) {
      alert(err.code);
    }
  });

// Breakout -> NSW_ACT , update function
document
  .getElementById("NSW_ACT-button")
  .addEventListener("click", async () => {
    try {
      BreakoutRoomsHotspot = data.BreakoutRoomsHotspot;
      console.log(BreakoutRoomsHotspot);
      BreakoutRoomsHotspot = {
        ...BreakoutRoomsHotspot,
        NSW_ACT: {
          link: document.getElementById("NSW_ACT").value,
        },
      };
      data = {
        ...data,
        BreakoutRoomsHotspot,
      };
      await app
        .firestore()
        .collection("backStage")
        .doc("staticData")
        .update(data);
      alert("NSW_ACT link updated successfully");
    } catch (err) {
      alert(err.code);
    }
  });
