import React, { useState } from "react";
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    CircularProgress,
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import { useSms } from "./useSms";

export function Sms() {
    const { users, loading, error, reload, deleteUser, updateAsMainNumber } =
        useSms();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    React.useEffect(() => {
        if (error) {
            setSnackbarOpen(true);
        }
    }, [error]);

    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    // Open and close dialog
    const handleInfoDialogOpen = () => setInfoDialogOpen(true);
    const handleInfoDialogClose = () => setInfoDialogOpen(false);

    return (
        <Box sx={{ p: 4, width: "100%", position: "relative" }}>
            {/* Refresh Icon */}
            <IconButton
                onClick={reload}
                color="primary"
                aria-label="refresh"
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                }}
            >
                <RefreshIcon />
            </IconButton>

            {/* Page Title */}
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
                مستخدمي الرسائل النصية
            </Typography>

            {/* Content */}
            {loading ? (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            ) : users.length === 0 ? (
                <Box
                    sx={{
                        mt: 3,
                        textAlign: "center",
                        p: 3,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#333", fontWeight: "bold" }}
                    >
                        لا يوجد مستخدمين لإضافة مستخدمين قم بتنزيل التطبيق وقم بطلب تسجيل الدخول عن
                        طريق المعلومات التالية
                    </Typography>
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        mt: 4,
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    <Table sx={{ minWidth: 650, tableLayout: "fixed" }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
                                    الإسم
                                </TableCell>
                                <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
                                    رقم الجوال
                                </TableCell>
                                <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
                                    الإجراءات
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                                        backgroundColor: user.is_main ? "#e8f5e9" : "inherit", // Highlight main user
                                    }}
                                >
                                    <TableCell align="right">
                                        {user.name} {user.is_main && <StarIcon sx={{ color: "#1976d2" }} />}
                                    </TableCell>
                                    <TableCell align="right">{user.mobile}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => updateAsMainNumber(user.id)}
                                            variant="outlined"
                                            disabled={user.is_main} // Disable for the main user
                                            sx={{
                                                mb: 1, // Add spacing for the "تعلم اكثر" button
                                            }}
                                        >
                                            تعيين كرقم رئيسي
                                        </Button>

                                        {/* Info Icon */}
                                        <Tooltip title="تعلم اكثر عن الرقم الرئيسي">
                                            <IconButton
                                                onClick={handleInfoDialogOpen}
                                                color="info"
                                                aria-label="learn more"
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={error}
            />

            {/* Information Dialog */}
            <Dialog
                open={infoDialogOpen}
                onClose={handleInfoDialogClose}
                aria-labelledby="info-dialog-title"
                aria-describedby="info-dialog-description"
            >
                <DialogTitle id="info-dialog-title">معلومات حول الرقم الرئيسي</DialogTitle>
                <DialogContent>
                    <DialogContentText id="info-dialog-description">
                        الرقم الرئيسي هو الحساب الذي من خلاله سيتم إرسال الرسالة النصية ويمكن تعيين رقم رئيسي واحد فقط لاغير.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInfoDialogClose} color="primary">
                        إغلاق
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
