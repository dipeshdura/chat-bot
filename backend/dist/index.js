import { app } from "./app.js";
import { PORT } from "./app.js";
import { connectDB } from "./db/connection.js";
// route 
//connection and listeners 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER STARTED ON PORT : ${PORT}`);
    });
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map