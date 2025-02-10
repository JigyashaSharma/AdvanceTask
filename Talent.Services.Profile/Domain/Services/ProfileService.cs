using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public List<AddLanguageViewModel> GetLanguageModelFromLanguage(List<UserLanguage> languages)
        {
            List<AddLanguageViewModel> languagesModel = new List<AddLanguageViewModel>();
            foreach (var userLanguage in languages)
            {
                if(userLanguage.IsDeleted == false)
                {
                    AddLanguageViewModel languageModel = new AddLanguageViewModel
                    {
                        Name = userLanguage.Language,
                        Level = userLanguage.LanguageLevel,
                        Id = userLanguage.Id,
                        CurrentUserId = userLanguage.UserId
                    };
                    languagesModel.Add(languageModel);
                }
                
            }
           
            return languagesModel;
        }
        public List<AddSkillViewModel> GetSkillModelFromUserSkill(List<UserSkill> skills)
        {
            List<AddSkillViewModel> skillsModel = new List<AddSkillViewModel>();
            foreach (var userSkill in skills)
            {
                if (userSkill.IsDeleted == false)
                {
                    AddSkillViewModel skill = new AddSkillViewModel
                    {
                        Name = userSkill.Skill,
                        Level = userSkill.ExperienceLevel,
                        Id = userSkill.Id
                    };
                    skillsModel.Add(skill);
                }
            }

            return skillsModel;
        }
        public List<AddEducationViewModel> GetEducationModelFromUserEducation(List<UserEducation> educations)
        {
            List<AddEducationViewModel> educationsModel = new List<AddEducationViewModel>();
            foreach (var userEducation in educations)
            {
                if (userEducation.IsDeleted == false)
                {
                    AddEducationViewModel educationModel = new AddEducationViewModel
                    {
                        Country = userEducation.Country,
                        InstituteName = userEducation.InstituteName,
                        Title = userEducation.Title,
                        Degree = userEducation.Degree,
                        YearOfGraduation = userEducation.YearOfGraduation,
                        Id = userEducation.Id
                    };
                    educationsModel.Add(educationModel);
                }
            }

            return educationsModel;
        }
        public List<AddCertificationViewModel> GetCertificateModelFromCertificates(List<UserCertification> certificates)
        {
            List<AddCertificationViewModel> certificationsModel = new List<AddCertificationViewModel>();
            foreach (var userCertification in certificates)
            {
                if (userCertification.IsDeleted == false)
                {
                    AddCertificationViewModel certificationModel = new AddCertificationViewModel
                    {
                        CertificationName = userCertification.CertificationName,
                        CertificationFrom = userCertification.CertificationFrom,
                        CertificationYear = userCertification.CertificationYear,
                        Id = userCertification.Id
                    };
                    certificationsModel.Add(certificationModel);
                }
            }
            return certificationsModel;
        }
        public List<ExperienceViewModel> GetExperienceModelFromExperiences(List<UserExperience> experiences)
        {
            List<ExperienceViewModel> experiencesModel = new List<ExperienceViewModel>();
            foreach (var userExperience in experiences)
            {
                if (userExperience.IsDeleted == false)
                {
                    ExperienceViewModel experienceModel = new ExperienceViewModel
                    {
                        Company = userExperience.Company,
                        Position = userExperience.Position,
                        Responsibilities = userExperience.Responsibilities,
                        Start = userExperience.Start,
                        End = userExperience.End,
                        Id = userExperience.Id
                    };
                    experiencesModel.Add(experienceModel);
                }
            }

            return experiencesModel;
        }
        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            if ( Id == null)
            {
                return null;
            }

            User user = await _userRepository.GetByIdAsync(Id);

            List<AddLanguageViewModel> languagesViewModel = GetLanguageModelFromLanguage(user.Languages);

            List<AddSkillViewModel> skillViewModel = GetSkillModelFromUserSkill(user.Skills);
            
            List<AddEducationViewModel> educationViewModels = GetEducationModelFromUserEducation(user.Education);

            List<AddCertificationViewModel> certificationViewModels = GetCertificateModelFromCertificates(user.Certifications);

            List<ExperienceViewModel> experienceViewModels = GetExperienceModelFromExperiences(user.Experience);


            var result = new TalentProfileViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender  = user.Gender,
                Email = user.Email,
                Phone = user.Phone,
                MobilePhone = user.MobilePhone,
                IsMobilePhoneVerified = user.IsMobilePhoneVerified,
                Address = user.Address,
                Nationality = user.Nationality,
                VisaStatus = user.VisaStatus,
                VisaExpiryDate = user.VisaExpiryDate,
                ProfilePhoto = user.ProfilePhoto,
                ProfilePhotoUrl = user.ProfilePhotoUrl,
                VideoName = user.VideoName,
                VideoUrl = user.VideoName,
                CvName = user.CvName,
                Summary = user.Summary,
                Description = user.Description,
                LinkedAccounts = user.LinkedAccounts,
                JobSeekingStatus = user.JobSeekingStatus,

                Languages = languagesViewModel,
                Skills = skillViewModel,
                Education = educationViewModels,
                Certifications = certificationViewModels,
                Experience = experienceViewModels
            };

            return result;
        }

        // This helper method creates a new TUserSubItem (UserSkill or UserLanguage) with common properties
        private TUserSubItem CreateSubItem<TUserSubItem>(string userId) where TUserSubItem : class, new()
        {
            var subItem = Activator.CreateInstance<TUserSubItem>();
            subItem.GetType().GetProperty("Id")?.SetValue(subItem, ObjectId.GenerateNewId().ToString());
            subItem.GetType().GetProperty("UserId")?.SetValue(subItem, userId);
            subItem.GetType().GetProperty("IsDeleted")?.SetValue(subItem, false);
            return subItem;
        }

        // This helper method finds the sublist(Skills or Languages) inside the TUserItem
        private List<TUserSubItem> GetSubItemList<TUserItem, TUserSubItem>(TUserItem existingItem)
        {
            if (existingItem is User user)
            {
                if (typeof(TUserSubItem) == typeof(UserSkill))
                {
                    return user.Skills as List<TUserSubItem>;
                }
                else if (typeof(TUserSubItem) == typeof(UserLanguage))
                {
                    return user.Languages as List<TUserSubItem>;
                }
            }
            return null;
        }

        /*Template to update the objects like language, skill.. */
        public List<TUserSubItem> UpdateUserItems<TModelItem, TUserItem, TUserSubItem>(
            List<TModelItem> modelItems,
            TUserItem existingItem,
            Action<TModelItem, TUserSubItem> updateItemFunc,
            string userId)
            where TUserItem : class, new()
            where TUserSubItem : class, new()
        {
            // Ensure existingItem and subItemList are not null
            if (existingItem == null)
            {
                throw new ArgumentNullException(nameof(existingItem), "The existing item cannot be null.");
            }
            var subItemList = GetSubItemList<TUserItem, TUserSubItem>(existingItem) ?? new List<TUserSubItem>();
            var newsubItemList = new List<TUserSubItem>();

            foreach (var item in modelItems)
            {
                // Find the existing item by Id
                var existingSubItem = subItemList.SingleOrDefault(x => x.GetType().GetProperty("Id")?.GetValue(x)?.ToString() == item.GetType().GetProperty("Id")?.GetValue(item)?.ToString());

                if (existingSubItem == null)
                {
                    //If subITem is not there create it
                    existingSubItem = CreateSubItem<TUserSubItem>(userId);
                    if (existingSubItem == null)
                    {
                        throw new InvalidOperationException("Failed to create a new sub-item.");
                    }

                }

                // Update the properties of the existing or newly created item using the provided update function
                updateItemFunc(item, existingSubItem);
                newsubItemList.Add(existingSubItem);  // Add the new item directly to the list
            }

            // Return the updated existingItems list
            return newsubItemList;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                existingUser.FirstName = model.FirstName;
                existingUser.MiddleName = model.MiddleName;
                existingUser.LastName = model.LastName;
                existingUser.Email = model.Email;
                existingUser.Phone = model.Phone;
                existingUser.MobilePhone = model.MobilePhone;
                existingUser.IsMobilePhoneVerified  = model.IsMobilePhoneVerified;
                existingUser.Address = model.Address;
                existingUser.Nationality = model.Nationality;
                existingUser.VisaStatus= model.VisaStatus;
                existingUser.VisaExpiryDate = model.VisaExpiryDate;
                existingUser.ProfilePhoto = model.ProfilePhoto;
                existingUser.ProfilePhotoUrl = model.ProfilePhotoUrl;
                existingUser.CvName = model.CvName;
                existingUser.LinkedAccounts = model.LinkedAccounts;
                existingUser.JobSeekingStatus = model.JobSeekingStatus;
                existingUser.Summary = model.Summary;
                existingUser.Description = model.Description;

                existingUser.VideoName = model.VideoName;

                existingUser.Skills = UpdateUserItems<AddSkillViewModel, User, UserSkill>(
                    model.Skills,
                    existingUser,
                    UpdateSkillFromView,
                    updaterId
                    );

                existingUser.Languages = UpdateUserItems<AddLanguageViewModel, User, UserLanguage>(
                   model.Languages,
                   existingUser,
                   UpdateLanguageFromView,
                   updaterId
                   );

                existingUser.Certifications = UpdateUserItems<AddCertificationViewModel, User, UserCertification>(
                   model.Certifications,
                   existingUser,
                   UpdateCertificateFromView,
                   updaterId
                   );

                existingUser.Education = UpdateUserItems<AddEducationViewModel, User, UserEducation>(
                   model.Education,
                   existingUser,
                   UpdateEducationFromView,
                   updaterId
                   );

                existingUser.Experience = UpdateUserItems<ExperienceViewModel, User, UserExperience>(
                   model.Experience,
                   existingUser,
                   UpdateExperienceFromView,
                   updaterId
                   );

                await _userRepository.Update(existingUser);
                return true;

            } catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteLanguage(AddLanguageViewModel deleteLanguage, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                foreach (var language in existingUser.Languages)
                {
                    if (language.Id == deleteLanguage.Id)
                    {
                        language.IsDeleted = true;
                        break;
                    }
                }

                await _userRepository.Update(existingUser);
                return true;

            } catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteSkill(AddSkillViewModel deleteSkill, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                foreach (var skill in existingUser.Skills)
                {
                    if (skill.Id == deleteSkill.Id)
                    {
                        skill.IsDeleted = true;
                        break;
                    }
                }

                await _userRepository.Update(existingUser);
                return true;

            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteExperience(ExperienceViewModel deleteExperience, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                foreach (var experience in existingUser.Experience)
                {
                    if (experience.Id == deleteExperience.Id)
                    {
                        experience.IsDeleted = true;
                        break;
                    }
                }

                await _userRepository.Update(existingUser);
                return true;

            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteEducation(AddEducationViewModel deleteEducation, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                foreach (var education in existingUser.Education)
                {
                    if (education.Id == deleteEducation.Id)
                    {
                        education.IsDeleted = true;
                        break;
                    }
                }

                await _userRepository.Update(existingUser);

                return true;

            }
            catch (MongoException e)
            {
                return false;
            }
        }
        public async Task<bool> DeleteCertificate(AddCertificationViewModel deleteCertificate, string updaterId)
        {
            try
            {
                User existingUser = await _userRepository.GetByIdAsync(updaterId);
                if (existingUser == null)
                {
                    throw new Exception();
                }

                foreach (var certificate in existingUser.Certifications)
                {
                    if (certificate.Id == deleteCertificate.Id)
                    {
                        certificate.IsDeleted = true;
                        break;
                    }
                }

                await _userRepository.Update(existingUser);
                return true;

            }
            catch (MongoException e)
            {
                return false;
            }
        }
        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateTalentPhoto(string userId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension))
            {
                return false;
            }

            var existingUser = (await _userRepository.Get(x => x.Id == userId)).FirstOrDefault();

            if(existingUser == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = existingUser.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                existingUser.ProfilePhoto = newFileName;
                //existingUser.ProfilePhotoUrl =  _fileService.GetFileURLLocal(newFileName, FileType.ProfilePhoto);
                existingUser.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _userRepository.Update(existingUser);
                return true;
            }

            return false;
        }
        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.Language = model.Name;
            original.LanguageLevel = model.Level;
        }
        protected void UpdateCertificateFromView(AddCertificationViewModel model, UserCertification original)
        {
            original.CertificationName = model.CertificationName;
            original.CertificationFrom = model.CertificationFrom;
            original.CertificationYear = model.CertificationYear;
        }
        protected void UpdateEducationFromView(AddEducationViewModel model, UserEducation original)
        {
            original.InstituteName = model.InstituteName;
            original.Country = model.Country;
            original.Title = model.Title;
            original.Degree = model.Degree;
            original.YearOfGraduation = model.YearOfGraduation;
        }
        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
