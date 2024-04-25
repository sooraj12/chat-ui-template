const messageStore = (set) => ({
  message: {
    msg: "",

    setMessage: (msg) => {
      set((state) => {
        state.message.msg = msg;
      });
    },
  },
});

export { messageStore };
