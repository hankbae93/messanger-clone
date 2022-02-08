# Social Media App

- MERN stacks

## Error..

클라이언트단에서 파일을 전송할때마다 multer를 통해 public에 저장하려는 과정을 구현하다 서버단에서 해당 오류가 나타났다..

    TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined

-api/index.js

```js
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	try {
		return res.status(200).json("File uploded successfully");
	} catch (error) {
		console.error(error);
	}
});
```

-client/component/share/Share.jsx

```jsx
const submitHandler = async (e) => {
	e.preventDefault();
	const newPost = {
		userId: user._id,
		desc: desc.current.value,
	};

	if (file) {
		const data = new FormData();
		const filename = Date.now() + file.name;
		/* 정말 어이없게도 기존 폼데이터에 넣는 코드의 순서만 바꿨더니 해결됏다
    data.append("file", file);
		data.append("name", filename);
    */
		data.append("name", filename);
		data.append("file", file);

		newPost.img = filename;
		try {
			await axios.post("/upload", data);
		} catch (error) {
			console.error(error);
		}
	}

	try {
		await axios.post("/posts", newPost);
	} catch (error) {}
};
```
