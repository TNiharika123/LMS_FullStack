import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Grid, 
  Divider, 
  Box, 
  Paper,
  IconButton,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import TranslateIcon from '@mui/icons-material/Translate';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';

const CourseDetailView = ({ course, onBack, onCourseApproved }) => {
  const [isApproved, setIsApproved] = useState(course?.status === 'published');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  if (!course) return null;

  const handleApprove = async () => {
    try {
      console.log('Approving course:', course._id); // Debug log
      const response = await fetch(`http://localhost:5000/api/admin/courses/${course._id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      console.log('Approval response:', result); // Debug log

      if (!response.ok) {
        throw new Error(result.message || 'Failed to approve course');
      }

      if (result.success) {
        setSnackbarMessage('Course approved successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsApproved(true);
        onCourseApproved?.(course._id);
      } else {
        throw new Error(result.message || 'Failed to approve course');
      }
    } catch (error) {
      console.error('Error approving course:', error);
      setSnackbarMessage(error.message || 'Something went wrong');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onBack} color="primary" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Course Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            icon={isApproved ? <CheckCircleIcon /> : <PendingIcon />} 
            label={isApproved ? 'Approved' : 'Pending Approval'} 
            color={isApproved ? 'success' : 'warning'}
            variant="outlined"
          />
          {!isApproved && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={handleApprove}
            >
              Approve Course
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title || 'Untitled Course'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {course.subtitle || 'No subtitle available'}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" fontWeight="medium" sx={{ fontWeight: 'bold' }}>
                    Description:
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 }}>
                  {course.description || 'No description available'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" fontWeight="medium" sx={{ fontWeight: 'bold' }}>
                    Category:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {course.category || 'Uncategorized'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SignalCellularAltIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" fontWeight="medium" sx={{ fontWeight: 'bold' }}>
                    Level:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {course.level || 'Not specified'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TranslateIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" fontWeight="medium" sx={{ fontWeight: 'bold' }}>
                    Language:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {course.primaryLanguage || 'Not specified'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TranslateIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" fontWeight="medium" sx={{ fontWeight: 'bold' }}>
                    Subtitle:
                  </Typography>
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {course.subtitle || 'Not available'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Commenting out Course Statistics section
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Course Statistics</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{course.totalEnrollments || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Enrollments</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <StarIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{course.averageRating ? course.averageRating.toFixed(1) : '0.0'}</Typography>
                  <Typography variant="body2" color="text.secondary">Average Rating</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <RateReviewIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{course.totalReviews || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Reviews</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <MenuBookIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4">{course.totalLessons || 0}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Lessons</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          */}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Instructor Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" fontWeight="medium">
                Name:
              </Typography>
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {course.instructorName || 'Unknown Instructor'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" fontWeight="medium">
                Email:
              </Typography>
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {course.instructor?.Email || course.instructorEmail || 'Not available'}
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Course Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label={course.status || 'draft'}
                color={
                  course.status === 'published' ? 'success' :
                  course.status === 'draft' ? 'default' : 'warning'
                }
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5">${course.pricing || 0}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" fontWeight="medium">
                Created:
              </Typography>
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {course.createdAt || 'Not available'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <UpdateIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" fontWeight="medium">
                Last Updated:
              </Typography>
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {course.date || 'Not available'}
              </Typography>
            </Box>
          </Paper>

          {/* Commenting out Course Requirements section
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Course Requirements</Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {(course.requirements || []).map((req, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
              {(!course.requirements || course.requirements.length === 0) && (
                <ListItem>
                  <ListItemText primary="No requirements specified" />
                </ListItem>
              )}
            </List>
          </Paper>
          */}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CourseDetailView;