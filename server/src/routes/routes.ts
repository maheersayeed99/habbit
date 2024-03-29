import express from "express";
import { update_progress, clean_table, get_todo, get_streaks, daily_update, get_all, get_disabled, authenticate, toggle_active, add_row, delete_row} from "../controllers/daily_status_controller";

const router = express.Router()

router.post('/update', update_progress);
router.post('/clean', clean_table);
router.get('/todo', get_todo);
router.get('/streaks', get_streaks);
router.post('/daily', daily_update);
router.get('/main', get_all);
router.get('/disabled', get_disabled);
router.post('/toggle', toggle_active);
router.post('/authenticate', authenticate);
router.post('/add_row', add_row);
router.post('/delete_row', delete_row);

export {router}